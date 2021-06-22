import users from "../users.json";

export default function home(props) {
  // const { userId } = req.session;
  // const user = users.find((result) => {
  //   return result.id === userId;
  console.log(props);
  // });
  // console.log("This Request ----->",req);
  return (
    <div>
      <h1>Home</h1>
      <ul></ul>
      <form method="post" action="/api/logout">
        {/* <h1>{props.userId}</h1> */}
        <button>Logout</button>
      </form>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  console.log(context.req.session);
  // const res = await fetch('https://.../data')
  // const data: Data = await res.json()

  return {
    props: {
       userId : context.req.session.userId
    },
  };
};
