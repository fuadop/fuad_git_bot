import { TOKEN, MATRICULATION_NUMBER, PASSWORD } from "./config"
import { Telegraf } from "telegraf"
import Extra from "telegraf/extra"
import puppeteer from "puppeteer"

const bot = new Telegraf(TOKEN)

bot.context.url = "https://ug.lidc.lasu.edu.ng/ft-content/students/login.php"

bot.start( ctx => {
    ctx.reply("Hello Fuad")
})

bot.help( ctx => {
    ctx.replyWithMarkdown(`
        **Fuad's Result Bot**
            __I made this bot to download my semester results easily__

        **Commands**
            * /download 
                *   The download command downloads your result 
                    from the [lasu lidc](https://lidc.lasu.edu.ng) website
             */downloadother
                *   The downloadother command allows download of results other than
                    your result
    `, Extra.markdown())
})

bot.command("download", async ctx => {
    ctx.reply("I am working on that sir, please wait...")
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(ctx.url, {waitUntil: "networkidle2"})
    await page.waitForSelector("input[name=matriculationNumber]")
    await page.$eval("input[name=matriculationNumber]", el => el.value = "matriculation number")
    await page.$eval("input[name=password]", el => el.value = "password")
    await page.click("button[name=login]")
    await page.waitForSelector("img")
    // await page.goto("https://ug.lidc.lasu.edu.ng/ft-content/students/profiles/")
    await browser.close()
    
})

bot.launch()
.then(() => {
    console.log("Bot is running")
})
.catch( error => {
    console.log("Couldn't start bot")
})