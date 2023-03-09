export type GenericModalProps = {
    show: boolean
    title: string
    description: string
    acceptTerms: boolean
    onAcceptClick: () => void
    onCloseClick: () => void
}
