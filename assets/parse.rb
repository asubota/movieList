
require 'nokogiri'
require 'open-uri'
require 'fileutils'
require 'net/http'
require 'thread'
require 'json'

def slug(item)
  item.gsub(/[^\w]/, '-').gsub(/-+/, '-').downcase
end

def get_extra(link)
  def get_mini_extra(rows,row_num)
    box = []
    rows[row_num].css('td')[1].css('a span:not(.tag-country-flag)').each do |item|
      value = item.text.strip.gsub(/[^a-zA-Zа-яА-Я0-9 ]/,'').downcase
      box << value unless value === 'еще'
    end

    box
  end

  puts "processing #{link}"

  movie_page = Nokogiri::HTML(open('http://brb.to/'+link)).css('div.l-tab-item-content')
  rows = movie_page.css('tr')
  extra = {}
  if rows.size == 5
    extra[:title_en]    = movie_page.css('div.b-tab-item__title-origin').text.strip
    extra[:title_ru]    = movie_page.css('div.b-tab-item__title-inner span').text.strip
    extra[:description] = movie_page.css('p.item-decription').text.strip
    
    extra[:genres]    = get_mini_extra rows, 0
    extra[:year]      = get_mini_extra rows, 1
    extra[:countries] = get_mini_extra rows, 2
    extra[:director]  = get_mini_extra rows, 3
    extra[:actors]    = get_mini_extra rows, 4
  end

  extra
end

def get_movies(page_id)
  movies = []
  page_link = "http://brb.to/video/films/?page=#{page_id}"
  doc = Nokogiri::HTML(open(page_link)).css('div.b-section-list div.b-poster-section').each do |item|
    
    link      = item.css('a.subject-link')[0]['href']
    extra     = get_extra link
    unless extra.empty?
      if extra[:title_en].empty?
        id = link.split('/').last.split('.').first
      else
        id = slug extra[:title_en]
      end

      image     = id + '.jpg'
      image_url = item.css('a img')[0]['src']

      image_path = "../public/logo/" + image
      open(image_path, 'wb') do |file|
        source = open(image_url)
        file << source.read
        source.close
      end

      data = {
        id: id,
        image: image
      }
      movies << data.merge(extra)
    end
  end

  movies
end

def time
  start = Time.now
  yield
  Time.now - start
end

dirname = File.dirname("../public/logo/")
unless File.directory?(dirname)
  FileUtils.mkdir_p(dirname)
end

moviesAll = []
page_count = 2
parsing_time = time do
  pages = 0..page_count
  threads = []
  queue = Queue.new
  pages.each{|page_id| queue << page_id }

  10.times do
      threads << Thread.new do
        while (page_id = queue.pop(true) rescue nil)
          puts "working on page: #{page_id}"
          movies = get_movies page_id
          moviesAll = moviesAll + movies unless movies.nil?
        end
      end
  end

  threads.each(&:join)

  movieCollection = "[#{moviesAll.map(&:to_json).join(",\n")}]"
  File.open('movies.json', 'w') { |file| file.write movieCollection }
  puts "Done !\n\n"
end

puts "movie-pages parsed:\t#{page_count+1}\nparse time:\t\t#{parsing_time} seconds\ntotal movie count:\t#{moviesAll.size}"