interface DataChart{
  faculty: string ;
  numberOfStudent:number
}

interface UserOverviewProps {
  data: DataChart[]
}

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';
export function  FacultySizeChart({ data }: UserOverviewProps)  {

    return (

        <ResponsiveContainer  width="90%" aspect={2}>
          <BarChart width={40} height={100} data={data} margin={{ top: 5,right: 1,left: 10,bottom: 5,}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faculty">
              <Label value="faculty" position="insideBottom" offset={-4} fill="#333"   fontSize={14} fontWeight="bold" />
            </XAxis>
            <YAxis>
              <Label value="Number of Students" position="insideLeft" angle={-90} offset={0}  fill="#1A237E" />
            </YAxis>
            <Tooltip />
            {/* <Legend  verticalAlign="top" height={36} /> */}
            <Bar dataKey="numberOfStudent" fill="#03A9F4" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
    );
}
