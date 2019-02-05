# frozen_string_literal: true

require 'discordrb'

isa = Discordrb::Bot.new token: 'NTQwODYwOTI1MzY4OTkxNzQ1.DztWPg.2nZG5nMM0-zH0xGwfQs62MBwyWI'

puts "This bot's invite URL is #{isa.invite_url}."
puts 'Click on it to invite it to your server.'

isa.message(content: 'Ping!') do |event|
  event.respond 'Pong!'
end

isa.run