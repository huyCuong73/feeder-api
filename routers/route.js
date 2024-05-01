import auth from "./auth.js"
import user from "./user.js"
import restaurant from "./restaurant.js"
import food from "./food.js"
import order from "./order.js"
import voucher from "./voucher.js"
import notification from "./notification.js"
import ticket from "./ticket.js"


function route(app){
    app.use('/api/auth', auth)
    app.use('/api/user', user)
    app.use('/api/restaurant', restaurant)
    app.use('/api/food', food)
    app.use('/api/order', order)
    app.use('/api/voucher', voucher)
    app.use('/api/notification', notification)
    app.use('/api/ticket', ticket)
}


export default route