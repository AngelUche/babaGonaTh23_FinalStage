// jshint esversion:6

interface UserOverviewProps {
    title: string
    count: number
    avatar: string
}

function UserOverview({ title, count, avatar }: UserOverviewProps) {
    
    return (
        <>
            <div className="w-[230px] pl-2 py-5 rounded flex items-center justify-start gap-x-4 shadow">
                <div className="w-[50px] h-[50px]">
                    <img className="w-full h-full" src={avatar} alt="student" />
                </div>
                <div>
                    <p className="text-[grey]">{title}</p>
                    <p className="font-bold">{count}</p>
                </div>
            </div>
        </>
    );
}

export { UserOverview }