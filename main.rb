# frozen_string_literal: true

require 'discordrb'
require 'yaml'
puts 'All dependencies loaded'

CONFIG = YAML.load_file('config/config.yaml')
puts 'Config loaded from file'

isa = Discordrb::Commands::CommandBot.new(token: CONFIG['token'],
                                          client_id: CONFIG['client_id'],
                                          prefix: CONFIG['prefix'])

puts "#{isa.bot_application.name}'s invite URL is #{isa.invite_url}."
puts 'Click on it to invite it to your server.'

isa.message(content: 'Ping!') do |event|
  event.respond 'Pong!'
end

isa.command :user do |event|
  event.user.name
end

isa.command :play do |_event, *args|
  if isa.bot_application.owner.id == _event.user.id
    if args.length > 0
      isa.game = args.join(' '); nil
      "I'm playing #{isa.profile.game}";
    end
  else
    "You don't have permissions to do this!"
  end
end

isa.run