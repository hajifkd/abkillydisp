if (location.search.includes('fwkillifishe')) {
    const items = document.querySelectorAll<HTMLAnchorElement>("table.sortable td:nth-child(1) a[href^=\"/cgi-bin/auction/\"]:nth-child(2)")

    function height(): number {
        return window.innerHeight
    }

    function vh(v: number): number {
        return (v * height()) / 100;
    }

    function showPopup(keyword: string, x: number, y: number) {
        if (document.querySelector("div#image_popup")) {
            return
        }
        const popupWindow = document.createElement("div")
        popupWindow.id = "image_popup"
        popupWindow.classList.add("popup")
        const yMax = height() - vh(50) + window.scrollY
        console.log(`ymax ${yMax}, y: ${y}`)
        popupWindow.style.left = `${x - window.innerWidth / 50}px`
        popupWindow.style.top = `${Math.min(y - window.innerHeight / 50, yMax)}px`

        const iframe = document.createElement("iframe")
        iframe.classList.add("frame")
        iframe.src = `https://www.bing.com/images/search?q=${encodeURIComponent(keyword)}&tsc=ImageBasicHover&first=1`
        popupWindow.appendChild(iframe)

        const removeHandler = () => {
            document.body.removeChild(popupWindow)
            document.body.removeEventListener("mouseover", removeHandler)
            document.body.removeEventListener("keydown", keyRemoveHandler)
        }
        const keyRemoveHandler = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                // esc
                removeHandler()
            }
        }
        setTimeout(() => {
            document.body.addEventListener("mouseover", removeHandler)
            document.body.addEventListener("keydown", keyRemoveHandler)
        }, 1000)
        document.body.appendChild(popupWindow)
    }

    [...items].forEach(item => item.addEventListener('mouseover', e => {
        showPopup(item.innerText.replace(/\d+\+?(\s+)?[eE]ggs/g, ""), e.pageX, e.pageY)
    }))
}