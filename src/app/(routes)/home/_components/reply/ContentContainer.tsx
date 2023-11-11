interface IProps {
  postId: number
}

const ContentContainer = ({ postId }: IProps) => {
  return (<div className="w-full h-full bg-black py-10 px-10 max-w-2xl"></div>);
}

export default ContentContainer;