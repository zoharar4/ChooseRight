import { httpService } from "./http.service"
import { utilService } from "./util.service"

export const emailService = {
    send,
}

async function send(type, templateParams) {
    utilService.devLog(`Email send — ${type} — before`, templateParams)
    const res = await httpService.post("email/send", { type, templateParams })
    utilService.devLog(`Email send — ${type} — done`, res)
    return res
}
