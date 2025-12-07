import MarksTypeContent from "./MarksTypeContent";

export default async function MarksTypeSelectionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <MarksTypeContent id={id} />;
}
