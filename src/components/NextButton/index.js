export default function NextButton( props ) {
    return (
      <>
      <form>
        <button type="submit" className="" onClick={() => props.handleNextSubmit("Previous")}>Previous</button> <button type="submit" className="" onClick={() => props.handleNextSubmit("Next")}>Next</button>
      </form>
      </>
    )
  }