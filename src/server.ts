import { AppController } from './main/express/app'

class Server {
  private appController: AppController

  start() {
    this.appController = new AppController()
    this.appController.app.listen(process.env.PORT || 5000)
  }

  async bootstrap() {
    try {
      this.start()
      console.log(`Server Started`)
    } catch (error) {
      console.log(`Error: `, error)
    }
  }
}

new Server().bootstrap()
