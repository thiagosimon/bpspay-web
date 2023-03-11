export type GenericModalProps = {
    show: boolean
    title: string
    description: string
    acceptTerms: boolean
    acceptTitle: string
    headerCloseIcon: boolean
    onAcceptClick: () => void
    onCloseClick?: () => void
}
