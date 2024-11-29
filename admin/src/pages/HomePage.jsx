import { useState } from "react"
import MainContent from "../components/MainContent";
import Sidebar from "../components/Sidebar";

const HomePage = () => {

    const [pageType, setPageType] = useState('categories');

    return (
        <main className="flex items-start py-4 px-[5%] gap-8">
            <Sidebar setPageType={setPageType} pageType={pageType} />
            <MainContent pageType={pageType} />
        </main>
    )
}

export default HomePage