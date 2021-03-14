import Route from '@ioc:Adonis/Core/Route'

Route.post('/', 'Authentication/Account/AccountAuthenticationController')
Route.get('/me', 'Authentication/AccountData/AccountDataAuthenticationController').middleware('auth')
Route.any('/logout', 'Authentication/AccountLogout/AccountLogoutController')
