"use client";
import { DestinationSuggestion } from "@/Models/Destination/DestinationModel";
import { TableColumn } from "@/Models/TableColumn";
import { DestinationViewModel } from "@/ViewModel/Destination/DestinationViewModel";
import { OptionsRow } from "@/components/OptionsRow/OptionsRow";
import PaginatedTable from "@/components/PaginatedTable/PaginatedTable";
import { useEffectAsync } from "@/hooks/useEffectAsync";
import { CommonToastSuccessWithTitle } from "@/utils/toast";
import { Grid, TableCell, TableRow, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useIntl } from "react-intl";
import GoBackButton from "@/components/GoBackButton/GoBackButton";
import { Routes } from "@/utils/routes";
import Image from "next/image";
import EmptyStateImage from "./../../../assets/undraw_not_found.svg";

export default function AdministrationSuggestions() {
  const i18n = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<{
    suggestions: Array<DestinationSuggestion>;
    count: number;
  }>({ suggestions: [], count: 0 });

  const searchParams = useSearchParams();
  const skip = parseInt(searchParams.get("skip") ?? "0");
  const startId = searchParams.get("startId");

  const handleChangePage = async (_event: unknown, newPage: number) => {
    const id = newPage > page ? data.suggestions.at(-1)?._id : undefined;

    setData(
      await DestinationViewModel.getDestinationSuggestionsPaginated(
        id ? 0 : newPage * 15,
        id
      )
    );

    setPage(newPage);
  };

  const handleDelete = async (id: string) => {
    await DestinationViewModel.onDelete(id);
    CommonToastSuccessWithTitle("toast_success_destination_deleted");
    setData(
      await DestinationViewModel.getDestinationSuggestionsPaginated(page * 15)
    );
  };

  useEffectAsync(async () => {
    setData(
      await DestinationViewModel.getDestinationSuggestionsPaginated(
        skip ?? 0,
        startId || undefined
      )
    );
  }, []);

  const columns: readonly TableColumn[] = [
    {
      id: "destination_name",
      label: "administration_suggestions_table_destination_title",
      minWidth: 170,
    },
    {
      id: "user",
      label: "administration_suggestions_table_user_title",
      minWidth: 170,
    },
    {
      id: "options",
      label: "common_options",
      maxWidth: 200,
    },
  ];

  const displayColumnData = (column: TableColumn, row: any) => {
    if (column.id === "options") {
      return <>{customOptionRow(row)}</>;
    } else if (column.id === "destination_name") {
      return <>{i18n.formatMessage({ id: row.destination.name })}</>;
    } else {
      return <>{row.user.username}</>;
    }
  };

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
          {displayColumnData(column, row)}
        </TableCell>
      ))}
    </TableRow>
  );

  const customOptionRow = (row: DestinationSuggestion) => (
    <OptionsRow
      router={router}
      pathname={pathname as string}
      elementId={row._id}
      deleteModalTitle="administration_destinations_delete_modal_title"
      deleteModalContent="administration_destinations_delete_modal_content"
      deleteLabel={i18n.formatMessage({
        id: "common_delete",
      })}
      deleteAction={() => handleDelete(row._id)}
      productOption={false}
      photoOption={false}
      editOption={false}
    />
  );

  return (
    <Grid container padding={{ xs: "22px", lg: "20px" }}>
      <GoBackButton url={Routes.Administration} />
      {data.suggestions.length > 0 ? (
        <PaginatedTable
          columns={columns}
          data={data.suggestions}
          displayTableRow={displayTableRow}
          customCount={data.count}
          customHandleChangePage={handleChangePage}
          handleDelete={handleDelete}
          page={page}
        />
      ) : (
        <Grid container marginTop="20px">
          <Typography>
            {i18n.formatMessage({
              id: "administration_suggestions_empty",
            })}
          </Typography>
          <Image
            src={EmptyStateImage}
            alt="No suggestion image"
            height="200"
            width="400"
          />
        </Grid>
      )}
    </Grid>
  );
}
