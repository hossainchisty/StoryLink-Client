

export default function Post() {
  return (
    <div className="post">
        <div className="image">
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1690175267986/da3e5ed2-6240-41b5-8a53-dcf1ac2bc541.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>
            Essential Concepts for
            DevOps Engineers
          </h2>
          <p className="info">
            <a href="" className="author">Hossain Chisty</a>
            <time>15-Aug-2023</time>
          </p>
          <p className="summary">
            Docker is a tool designed to make it easier to create, deploy, and
            run applications by using containers. It allows you to attach a
            container to as many networks as you like, you can also attach an
            already-running container.
          </p>
        </div>
      </div>
  )
}
