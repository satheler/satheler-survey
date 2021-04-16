import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Respondent/GetAll/GetAllRespondentsController').middleware('maybeAuth')
Route.post('/', 'Respondent/Create/CreateRespondentController').middleware('maybeAuth')
