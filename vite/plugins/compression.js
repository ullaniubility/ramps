import compression from 'vite-plugin-compression'

export default function createCompression(primitive) {
    const plugin = [
        compression({
            ext: '.gz',
            deleteOriginFile: false
        }),
        compression({
            ext: '.br',
            algorithm: 'brotliCompress',
            deleteOriginFile: false
        })
    ]
    return primitive === 'true' ? [] : plugin
}
