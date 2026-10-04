/* global hexo */
function setStyleProperty(style, property, value) {
    const normalizedValue = /^\d+(?:\.\d+)?$/.test(String(value)) ? `${value}px` : value
    const declaration = `${property}: ${normalizedValue}`
    const pattern = new RegExp(`(^|;)\\s*${property}\\s*:[^;]*`, 'i')

    if (pattern.test(style)) {
        return style.replace(pattern, (_, separator) => `${separator} ${declaration}`)
    }

    return `${style.trim().replace(/;?$/, ';')} ${declaration};`
}

hexo.extend.tag.register('codepen', (args) => {
    // 内置默认配置
    const default_config = {
        style: 'height: 256px; width: 100%;',
        scrolling: 'no',
        frameborder: 'no',
        loading: 'lazy',
        allowtransparency: 'true',
        allowfullscreen: 'true'
    }

    const config = { ...default_config, ...hexo.config.codepen }
    args.forEach(arg => {
        const separator = arg.indexOf(':')
        if (separator === -1) return
        config[arg.slice(0, separator)] = arg.slice(separator + 1)
    })

    const { src_prefix, 
            slug_hash, 
            default_tab, 
            theme_id, 
            style, 
            height,
            width,
            scrolling, 
            frameborder, 
            loading, 
            allowtransparency, 
            allowfullscreen } = config

    let iframeStyle = style
    if (height != null && height !== '') iframeStyle = setStyleProperty(iframeStyle, 'height', height)
    if (width != null && width !== '') iframeStyle = setStyleProperty(iframeStyle, 'width', width)
    const iframeThemeId = theme_id === 'dark' ? '-3' : theme_id

    return `<iframe 
                src="${src_prefix}/${slug_hash}?default-tab=${default_tab}&theme-id=${iframeThemeId}" 
                style="${iframeStyle}" 
                scrolling=${scrolling} 
                frameborder=${frameborder} 
                loading=${loading}
                allowtransparency=${allowtransparency}
                allowfullscreen=${allowfullscreen}
            >
            </iframe>`
})
