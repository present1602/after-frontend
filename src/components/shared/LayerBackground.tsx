const LayerBackground = (props: any) => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen overflow-auto bg-black opacity-50">
      {props.children}
    </div>
  );
}

export default LayerBackground;