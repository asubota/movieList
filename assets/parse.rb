
require 'nokogiri'
require 'open-uri'
require "active_support/core_ext"
require 'open-uri'
require 'fileutils'
require 'net/http'

moviesAll = []

def slug(item)
  item.gsub(/[^\w]/, '-').gsub(/-+/, '-').downcase
end

def get_extra(link)
  def get_mini_extra(rows,row_num)
    box = []
    rows[row_num].css('td')[1].css('a span:not(.tag-country-flag)').each do |item|
      value = item.text.strip.gsub(/[^a-zA-Zа-яА-Я0-9 ]/,'')
      box << value unless value === 'еще'
    end

    box
  end

  movie_page = Nokogiri::HTML(open('http://brb.to/'+link)).css('div.l-center')
  rows = movie_page.css('tr')
  extra = {}
  if rows.size == 5
    extra[:title_en]  = movie_page.css('div.b-tab-item__title-origin').text.strip
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
    title_ru  = item.css('a > span').text.strip
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
        title_ru: title_ru,
        image: image
      }
      movies << data.merge(extra)
    end
  end

  movies
end

threads = []
3.times.map do |i|
  threads << Thread.new do
    # pages from 0 to 500
    for page_id in (i*5)..(1*100)
      puts "\nstarted page #{page_id}\n"
      movies = get_movies(page_id)
      moviesAll = moviesAll + movies unless movies.nil?
      puts "\nfinished page: #{page_id}\n"
      sleep 8
    end
  end
end
threads.each(&:join)

movieCollection = "[#{moviesAll.map(&:to_json).join(",\n")}]"
File.open('movies.json', 'w') { |file| file.write movieCollection }

puts "\nDone !"
