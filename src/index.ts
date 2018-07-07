import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import GameplayController from "./gameplay/controller"
import setupDb from './db'

const app = createKoaServer({
	cors: true,
	controllers: [
		GameplayController
	]
})

setupDb()
  .then(_ => // what does the underscore mean? how and why do we use it? 
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))