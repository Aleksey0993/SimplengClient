import FingerPrintJS from '@fingerprintjs/fingerprintjs'

const fpPromise = FingerPrintJS.load()

export default class FingerPrint{
    static async getUserID(){
        try {
            const fp = await fpPromise
            const result = await fp.get()
            return result.visitorId
            
        } catch (error) {
            console.log(error)
        }
    }
   
}
