import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    globalCss: {
        "html, body": {
            margin: 0,
            padding: 0,
            backgroundColor: "#d4d4d8",
        },
    },
    theme: {
        tokens: {
            colors: {
                TecTho: { value: "#27272a" },
            },
        },
    },
})

export default createSystem(config)