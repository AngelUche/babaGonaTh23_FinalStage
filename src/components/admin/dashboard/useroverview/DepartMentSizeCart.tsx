// import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer , CartesianGrid} from 'recharts';

interface DataChart{
  department: string ;
  numberOfStudent:number
}

interface UserOverviewProps {
  data: DataChart[]
}




import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip,Label, Legend, ResponsiveContainer } from 'recharts';
export function  DepartMentSizeCart({ data }: UserOverviewProps)  {

    return (
      // <div className='w-[650px] h-[300px]'>

        <ResponsiveContainer  width="90%" aspect={2}>
          <BarChart
            width={40}
            height={100}
            data={data}
            margin={{
              top: 5,
              right: 1,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department">
              <Label value="department" position="insideBottom" offset={-4} fill="#333"   fontSize={14} fontWeight="bold" />
            </XAxis>
            <YAxis>
              <Label value="Number of Students" position="insideLeft" angle={-90} offset={0}  fill="#1A237E" />
            </YAxis>
            <Tooltip />
            <Legend  verticalAlign="top" height={36} />
            <Bar dataKey="numberOfStudent" fill="#9C27B0" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
      // </div>
    );
}
