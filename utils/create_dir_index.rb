#!/usr/bin/env ruby

# ~/create_dir_index.rb 2015.05 > 2015.05/dir_index.json

dir = ARGV[0]

def get_type(filename)
  case filename.split('.').last
  when 'jpg','png','bmp', 'heic'
    'image'
  when 'mp4','3gp','mov'
    'video'
  else
    raise "unknown file type #{filename}"
  end
end

require 'date'
MIN_YEAR = '1800'
MAX_YEAR = '2100'
def valid_datetime?(s)
  DateTime.parse s
  s.between?(MIN_YEAR, MAX_YEAR) ? true : false
rescue
  false
end

def get_datetime(filename)
  case filename
  when /([\d]{8})[_-]([\d]{6})/ # IMG_20150520_180241945_HDR.jpg or Screenshot_20210401-114901_Gmail.jpg
    d = $1
    t = $2
    s = "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} #{t[0..1]}:#{t[2..3]}:#{t[4..5]}" # "2009-10-13 15:00:00"
  when /[^\d]([\d]{8})[^\d]/ # no time, only date
    d = $1
    s = "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} 00:00:00" # "2009-10-13 00:00:00"
  else
    nil
  end
  valid_datetime?(s) ? s : nil
end

a = []
Dir[File.join(dir,'*.*')].each do |f|
  next if f.end_with?('dir_index.json')
  entry = {
    "type" => get_type(f),
    "url" => "/files/#{f}",
    "tnurl" => "/files/#{File.join(File.dirname(f), 'thumbnails', File.basename(f).split('.')[0..-2].join('.')+'.jpg')}",
  }
  d = get_datetime(f)
  entry['datetime'] = d if d
  a << entry
end
require 'json'
puts JSON.pretty_generate(a.sort_by { |e| e['datetime'] || e['url'] })
