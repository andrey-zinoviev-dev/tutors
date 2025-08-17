export default function TutorPage({ params }: { params: { id: string } }) {
    return <h2>Вот тут будет урок конкретного учителя {params.id}</h2>;
}