import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Survey/GetAll/GetAllSurveysController')
Route.get('/:id', 'Survey/Get/GetSurveyController')
Route.post('/', 'Survey/Create/CreateSurveyController').middleware('auth')
Route.put('/:id', 'Survey/Update/UpdateSurveyController').middleware('auth')
Route.delete('/:id', 'Survey/Delete/DeleteSurveyController').middleware('auth')
