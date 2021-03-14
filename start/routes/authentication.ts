import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'Authentication/Account/AccountAuthenticationController')
Route.any('/logout', 'Authentication/Logout/LogoutController')
