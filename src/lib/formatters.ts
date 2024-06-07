export const formatDate = (date: string | null, showYears: boolean = true) => {
    if (!date) return ""
    const dateObj = new Date(date)
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    if (showYears) return `${dateObj.getDate().toString()} de ${monthNames[dateObj.getMonth()]} de ${dateObj.getFullYear().toString()}`

    return `${dateObj.getDate().toString()} de ${monthNames[dateObj.getMonth()]}`
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
}