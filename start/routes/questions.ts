import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'Question/GetAll/GetAllQuestionsController')
Route.get('/:id', 'Question/Get/GetQuestionController')
Route.post('/', 'Question/Create/CreateQuestionController').middleware('auth')
Route.put('/:id', 'Question/Update/UpdateQuestionController').middleware('auth')
Route.delete('/:id', 'Question/Delete/DeleteQuestionController').middleware('auth')
