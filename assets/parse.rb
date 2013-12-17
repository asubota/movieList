require 'nokogiri'
require 'open-uri'
require "active_support/core_ext"
require 'open-uri'
require 'fileutils'

movies = []
host = 

def slug(item)
  item.gsub(/[^\w]/, '-').gsub('--', '-').downcase
end

def get_extra(link)

  def get_mini_extra(movie_page,row_num)
    box = []
    movie_page.css('tr')[row_num].css('td')[1].css('a span:not(.tag-country-flag)').each do |item|
      value = item.text.strip.gsub(/[^a-zA-Zа-яА-Я]/,'')
      box.push value unless value === 'еще'
    end

    box
  end

  movie_page = Nokogiri::HTML(open('http://brb.to/'+link)).css('div.item-info')  
  genres    = get_mini_extra movie_page, 0
  countries = get_mini_extra movie_page, 2
  director  = get_mini_extra movie_page, 3
  actors    = get_mini_extra movie_page, 4

  extra = {
    genres: genres,
    actors: actors,
    director: director,
    countries: countries
  }

end 

page_link = 'http://brb.to/video/films/?page=1';
doc = Nokogiri::HTML(open(page_link)).css('div.b-section-list div.b-poster-section').each do |item|

  link      = item.css('a.subject-link')[0]['href']
  title_ru  = item.css('a > span').text.strip
  title_en  = item.css('a b span p')[0].text.strip
  year      = item.css('a b span p')[1].text.strip.gsub(/[^\d]/, '')
  image_url = item.css('a img')[0]['src']
  id        = slug title_en
  image     = id + '.jpg'
  extra     = get_extra link 

  image_path = "../public/logo/" + image 
  open(image_path, 'wb') do |file|
    file << open(image_url).read
  end

  r = {
    id: id,
    title: {
      en: title_en,
      ru: title_ru,
    },
    image: image,
    image_path: image_path,

    year: year,
    extra: extra
  }

  movies.push r
end

rests = movies.map(&:to_json).join(",\n")
rests = "[#{rests}]"

File.open('movies.json', 'w') { |file| file.write rests }
