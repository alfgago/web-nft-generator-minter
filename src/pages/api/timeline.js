import axios from "axios"

export default async (req, res) => {
    const wpUrl =
        process.env.WORDPRESS_URL ??
        "https://rubberbullets.longlead-dev.decimalstudios.com"
    const domain =
        process.env.DOMAIN ?? "https://rubberbullets.decimalstudios.com"

    const { data } = await axios.get(`${wpUrl}/wp-json/rb/timeline`)
    if (data) {
        const replacer = new RegExp(wpUrl, "g")
        const yoastHead = data.yoast_head.html
        let yoast = yoastHead.replace(replacer, domain)

        const replacerWP = new RegExp(domain + "/wp-content", "g")
        yoast = yoast.replace(replacerWP, wpUrl + "/wp-content")

        const menuResponse = await axios.get(`${wpUrl}/wp-json/rb/chapters`)
        const menu = menuResponse.data

        res.status(200).json({
            data,
            yoast,
            menu,
        })
    }

    res.status(400).json({ message: 'Se cae' })
}
