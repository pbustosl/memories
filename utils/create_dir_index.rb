#!/usr/bin/env ruby

# ~/create_dir_index.rb 201505 > 201505/dir_index.json

dir = ARGV[0]

a = []
Dir[File.join(dir,'*.jpg')].sort.each do |f|
  datetime = nil
  case f
  when /([\d]{8})_([\d]{6})/ # IMG_20150520_180241945_HDR.jpg
    d = $1
    t = $2
    datetime = "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} #{t[0..1]}:#{t[2..3]}:#{t[4..5]}" # "2009-10-13 15:00:00"
  when /([\d]{8})-([\d]{6})/ # Screenshot_20210401-114901_Gmail.jpg
    d = $1
    t = $2
    datetime = "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} #{t[0..1]}:#{t[2..3]}:#{t[4..5]}" # "2009-10-13 15:00:00"
  when /IMG-([\d]{8})-WA/ # IMG_20150520_180241945_HDR.jpg
    d = $1
    datetime = "#{d[0..3]}-#{d[4..5]}-#{d[6..7]} 00:00:00" # "2009-10-13 15:00:00"
  else
    d = dir
    datetime = "#{d[0..3]}-#{d[4..5]}-01 00:00:00" # "2009-10-01 00:00:00"
    puts "unknown filename pattern: #{f} using default: #{datetime}"
  end
  if datetime
    entry = {
      "type" => "image",
      "url" => "/files/#{f}",
      "tnurl" => "/files/#{File.join(File.dirname(f), 'thumbnails', File.basename(f))}",
      "datetime" => datetime
    }
    a << entry
  end
end
require 'json'
puts JSON.pretty_generate a
