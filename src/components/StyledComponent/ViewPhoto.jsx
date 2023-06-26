<ContainerImg3>
  {imageRef ? (
    Object.keys(imageRef).map((key) => (
      <>
        <Img
          id={key}
          src={imageRef[key]}
          onClick={handleImg}
          onMouseEnter={handleImg}
          style={{
            border: key === imageRefId ? "2px solid #e30613" : "none",
          }}
        />
      </>
    ))
  ) : (
    <Skeleton width={"90%"} height={150} />
  )}
</ContainerImg3>;
