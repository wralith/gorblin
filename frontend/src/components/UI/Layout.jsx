export default function Layout(props) {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center text-center bg-gray-200">
      {props.children}
    </div>
  )
}
