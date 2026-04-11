import { httpService } from "./http.service"

export const emailService = {
    send,
}

async function send(type, templateParams) {
    return httpService.post("email/send", { type, templateParams })
}
