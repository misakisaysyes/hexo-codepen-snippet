/* global hexo */

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
        const buf = arg.split(':')
        config[buf[0]] = buf[1]
    })

    const { src_prefix, 
            slug_hash, 
            default_tab, 
            theme_id, 
            style, 
            scrolling, 
            frameborder, 
            loading, 
            allowtransparency, 
            allowfullscreen } = config

    return `<iframe 
                src="${src_prefix}/${slug_hash}?default-tab=${default_tab}&theme-id=${theme_id}" 
                style="${style}"
                scrolling=${scrolling} 
                frameborder=${frameborder} 
                loading=${loading}
                allowtransparency=${allowtransparency}
                allowfullscreen=${allowfullscreen}
            >
            </iframe>`
})