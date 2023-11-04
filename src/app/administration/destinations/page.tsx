"use client";
import { Destination } from "@/Models/Destination/DestinationModel";
import { TableColumn } from "@/Models/TableColumn";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { CreateButton } from "@/components/Buttons/Buttons";
import { OptionsRow } from "@/components/OptionsRow/OptionsRow";
import PaginatedTable from "@/components/PaginatedTable/PaginatedTable";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { Routes } from "@/utils/routes";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import styled from "@emotion/styled";
import { Grid, TableCell, TableRow } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useIntl } from "react-intl";
import GoBackButton from "@/components/GoBackButton/GoBackButton";

export default function AdministrationDestinations() {
  const i18n = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState<number>(0);

  const handleChangePage = async (_event: unknown, newPage: number) => {
    const id = newPage > page ? data.destinations.at(-1)?._id : undefined;

    setData(
      await DestinationViewModel.getAllPaginated(id ? 0 : newPage * 15, id)
    );

    setPage(newPage);
  };

  const handleDelete = async (id: string) => {
    await DestinationViewModel.onDelete(id);
    CommonToastSuccessWithTitle("toast_success_destination_deleted");
    setData(await DestinationViewModel.getAllPaginated(page * 15));
  };

  const searchParams = useSearchParams();
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const startId = searchParams.get("startId");

  const [data, setData] = useState<{
    destinations: Array<Destination>;
    count: number;
  }>({ destinations: [], count: 0 });

  useEffectAsync(async () => {
    setData(
      await DestinationViewModel.getAllPaginated(
        skip ?? 0,
        startId || undefined
      )
    );
  }, []);

  const columns: readonly TableColumn[] = [
    { id: "name", label: "common_name", minWidth: 170 },
    {
      id: "options",
      label: "common_options",
      maxWidth: 200,
    },
  ];

  const displayTableRow = (row: any) => (
    <TableRow hover tabIndex={-1} key={row._id}>
      {columns.map((column) => (
        <TableCell
          key={column.id + row._id}
          style={{
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
          }}
        >
          {column.id === "options" ? (
            <>{customOptionRow(row)}</>
          ) : (
            i18n.formatMessage({
              id: row.name,
            })
          )}
        </TableCell>
      ))}
    </TableRow>
  );

  const customOptionRow = (row: Destination) => (
    <OptionsRow
      router={router}
      pathname={pathname as string}
      elementId={row._id}
      photoLabel={i18n.formatMessage({
        id: "common_photos",
      })}
      editLabel={i18n.formatMessage({
        id: "common_edit",
      })}
      deleteModalTitle="administration_destinations_delete_modal_title"
      deleteModalContent="administration_destinations_delete_modal_content"
      deleteLabel={i18n.formatMessage({
        id: "common_delete",
      })}
      deleteAction={() => handleDelete(row._id)}
    />
  );

  return (
    <>
      <Grid container padding={{ xs: "22px", lg: "20px" }}>
        <GoBackButton url={Routes.Administration} />
      </Grid>
      <TopOptionsContainer>
        <CreateButton
          label={i18n.formatMessage({
            id: "administration_destinations_add_destination",
          })}
          onClick={() =>
            router.push(Routes.Administration_Create(pathname as string))
          }
        />
      </TopOptionsContainer>
      <PaginatedTable
        columns={columns}
        data={data.destinations}
        displayTableRow={displayTableRow}
        customCount={data.count}
        customHandleChangePage={handleChangePage}
        handleDelete={handleDelete}
        page={page}
      />
    </>
  );
}

const TopOptionsContainer = styled("div")`
  display: flex;
  justify-content: end;
  margin: 10px;
`;
