import { httpService } from './http.service'
import { utilService } from './util.service'

export const aiService = {
    improve,
}

// Backend contract:
//   POST ai/improve/:type  body: { obj, message, history }
//   returns: { improvedObj, assistantMsg }
async function improve(type, obj, message, history = []) {
    utilService.devLog(`AI improve — sending ${type}`, { message, obj })
    const res = await httpService.post(`ai/improve/${type}`, { obj, message, history })
    utilService.devLog(`AI improve — received`, res)
    return res
}
