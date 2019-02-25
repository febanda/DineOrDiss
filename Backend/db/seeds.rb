# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Restaurant.destroy_all

    Restaurant1 = Restaurant.create(name: 'Pappas Steakhouse', image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/0xr5r1ecRQ2TgHjamMwGNQ/o.jpg', price: 100, rating: 4.5, categories: [{alias: "steak", title: "steakhouses"}] )


    User1 = User.create(name:'Francisco Banda', email:'febanda1234@yahoo.com', password_digest: '456')


    Match1 = Match.create(restaurant: Restaurant1, user: User1)


