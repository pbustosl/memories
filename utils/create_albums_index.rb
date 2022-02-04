#!/usr/bin/env ruby

# ~/create_album_index.rb > albums.json

a = []
Dir['*'].sort.reverse.each do |d|
  next if d == 'albums.json'
  entry = {
    "name" => d.gsub('.',' '),
    "path" => "/files/#{d}/dir_index.json"
  }
  a << entry
end
require 'json'
puts JSON.pretty_generate a
