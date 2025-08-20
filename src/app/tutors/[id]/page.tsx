interface TutorPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function TutorPage({ params }: TutorPageProps) {

    const { id } = await params;
    return <h2>Вот тут будет урок конкретного учителя {id}</h2>;
}