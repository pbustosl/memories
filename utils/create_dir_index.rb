#!/usr/bin/env ruby

# ~/create_dir_index.rb 2015.05 > 2015.05/dir_index.json

dir = ARGV[0]

def get_type(filename)
  case filename.split('.').last
  when 'jpg','jpeg','othertypehere'
    'image'
  when 'mp4','3gp'
    'video'
  else
    raise "unknown file type #{filename}"
  end
end

def get_datetime(filename)
  case filename
  when /([\d]{8})[_-]([\d]{6})/ # IMG_20150520_180241945_HDR.jpg or Screenshot_20210401-114901_Gmail.jpg
    d = $1
    t = $2
    "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} #{t[0..1]}:#{t[2..3]}:#{t[4..5]}" # "2009-10-13 15:00:00"
  when /IMG-([\d]{8})-WA/ # no time, only date
    d = $1
    "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} 00:00:00" # "2009-10-13 00:00:00"
  when /_([\d]{8})\./ # no time, only date
    d = $1
    "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} 00:00:00" # "2009-10-13 00:00:00"
  else
    nil
  end
end

a = []
Dir[File.join(dir,'*.*')].sort.reverse.each do |f|
  next if f.end_with?('dir_index.json')
  entry = {
    "type" => get_type(f),
    "url" => "/files/#{f}",
    "tnurl" => "/files/#{File.join(File.dirname(f), 'thumbnails', File.basename(f).split('.').first+'.jpg')}",
  }
  d = get_datetime(f)
  entry['datetime'] = d if d
  a << entry
end
require 'json'
puts JSON.pretty_generate a
