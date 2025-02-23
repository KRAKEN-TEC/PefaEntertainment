import { Breadcrumb } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

const LinkTree = () => {
  const { serieId, seasonNumber } = useParams();

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin/serie-panel/series">Series</Breadcrumb.Link>
        </Breadcrumb.Item>
        {serieId &&
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href={`/admin/serie-panel/series/${serieId}`}>Seasons</Breadcrumb.Link>
            </Breadcrumb.Item>
          </>
        }
        {seasonNumber &&
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="">Episodes</Breadcrumb.Link>
            </Breadcrumb.Item>
          </>
        }
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

export default LinkTree
