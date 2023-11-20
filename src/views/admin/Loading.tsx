interface props{
  title:string
}
export function Loading({title}:props) {
  return (
    <div className="flex items-center justify-center">{title}</div>
  )
}
