import { Breadcrumb } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

const LinkTree = () => {
  const { serieSlug, seasonNumber } = useParams();

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/admin/serie-panel/series">Series</Breadcrumb.Link>
        </Breadcrumb.Item>
        {serieSlug &&
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href={`/admin/serie-panel/series/${serieSlug}/seasons`}>Seasons</Breadcrumb.Link>
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
