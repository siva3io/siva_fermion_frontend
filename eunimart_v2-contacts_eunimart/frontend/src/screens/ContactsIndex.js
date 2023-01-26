import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTableContact,
  deleteContact,
  viewAccessManagement,
} from "../redux/Action/action";
import RemoteDynamicTable from "Remote/DynamicTable";
import { useHistory } from "react-router-dom";
import "../index.css";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";

const ContactsIndex = () => {
  let dispatch = useDispatch();

  const RemoteDynamicAppBar = React.lazy(() => import("Remote/DynamicAppBar"));

  const RemoteWrapper = ({ children }) => (
    <div>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );

  const { contacts_table_data, contactsdata_table_meta, contactsdata, access } =
    useSelector(state => state.data);

  useEffect(() => {
    dispatch(viewAccessManagement());
    dispatch(loadTableContact(params));
  }, []);

  // useEffect(() => {
  //   dispatch(loadContactsData(params));
  // }, [params]);

  const [params, setParams] = useState({ limit: 10, offset: 1 });
  const [dynamicAppBar, setDynamicAppBar] = useState([]); //state to manage dynamic appbar
  const [selectedId, setId] = useState(0);

  const handleChangeDyanmicAppBar = value => {
    //setDynamicAppBar(value);
  };
  const history = useHistory();

  const handleViewProduct = id => {
    history.push(`/contacts/View/${id}`);
  };

  const handleEditProduct = id => {
    //history.push(`/contacts/View/${id}`);
    history.push("/contacts/edit/" + id);
  };

  useEffect(() => {
    setCustomOptions([
      {
        label: "View Contact",
        func: product_id => handleViewProduct(product_id),
        flag: access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
      },
      {
        label: "Edit Contact",
        func: product_id => handleEditProduct(product_id),
        flag: access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
      },
      {
        label: "Delete Contact",
        func: product_id => handleDeleteModalOpen(product_id),
        flag: access
          ?.find(row => row === row)
          ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
      },
    ]);
  }, [access]);

  const [customOptions, setCustomOptions] = useState([
    {
      label: "View Contact",
      func: product_id => handleViewProduct(product_id),
      flag: access
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "READ")?.ctrl_flag,
    },
    {
      label: "Edit Contact",
      func: product_id => handleEditProduct(product_id),
      flag: access
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "UPDATE")?.ctrl_flag,
    },
    {
      label: "Delete Contact",
      func: product_id => handleDeleteModalOpen(product_id),
      flag: access
        ?.find(row => row === row)
        ?.view_actions_json?.find(o => o.lookup_code === "DELETE")?.ctrl_flag,
    },
    // {
    //   label: "Mark as Favourite",
    //   //func: (product_id) => handleEditProductTemplate(product_id),
    // },
    // {
    //   label: "Archive Contact",
    //   //func: (product_id) => handleArchiveModalOpen(product_id),
    // },
    // {
    //   label: "Download Contact",
    //   //func: (product_id) => handleDeleteModalOpen(product_id),
    // },
    // {
    //   label: "Copy/Duplicate Contact",
    //   //func: (product_id) => handleDeleteModalOpen(product_id),
    // },
  ]);

  const RemoteModalViewV2 = React.lazy(() => import("Remote/ModalViewV2"));

  const [contactId, setcontactId] = useState(0);
  const [deleteModalOpen, setdeleteModalOpen] = useState(false);

  const handleDeleteModalOpen = id => {
    setcontactId(id);
    setdeleteModalOpen(true);
  };

  const handleDeleteProduct = value => {
    dispatch(deleteContact(contactId));
    setTimeout(() => {
      dispatch(loadTableContact(params));
    }, 300);
    setdeleteModalOpen(false);
  };

  const handleDeleteModalClose = value => {
    setdeleteModalOpen(false);
  };

  const headCells = [
    {
      key: "first_name",
      numeric: false,
      label: "Contact Name",
      type: "text",
    },
    {
      key: "company_name",
      numeric: false,
      label: "Company Name",
      type: "text",
    },
    {
      key: "primary_phone",
      numeric: false,
      label: "PH. no.",
      type: "text",
    },
    {
      key: "primary_email",
      numeric: false,
      label: "Email ID",
      type: "text",
    },
    // {
    //   key: "contact_type.display_name",
    //   count: 2,
    //   numeric: false,
    //   label: "Business Type",
    //   type: "text",
    // },
    {
      key: "default_address.address_line_1",
      count: 2,
      numeric: false,
      label: "Address",
      type: "text",
    },
    {
      key: "contact_type.display_name",
      numeric: false,
      label: "Contact Type",
      type: "text",
      count: true,
    },
    {
      key: "additional_information.notes",
      count: 2,
      numeric: false,
      label: "Note",
      type: "text",
    },
    {
      key: "action",
      numeric: true,
      label: "Action",
      type: "action",
    },
  ];

  const sortOptions = [
    {
      label: "Sort by Contact Name",
      subItems: [
        {
          label: "Latest",
          key: "asc",
        },
        {
          label: "Oldest",
          key: "desc",
        },
      ],
      func: value => {
        dispatch(fetchSearchProduct({ picklist_id: value }, "sort"));
      },
    },
  ];

  const [filterOptions, setFilterOptions] = useState([
    {
      label: "Contact Name",
      collapseState: false,
      value: "contact_name",
    },
    {
      label: "Clear All",
      collapseState: false,
      value: "code",
    },
  ]);

  const [searchType, setSearchType] = useState("uom_name");

  const searchOptions = [{ label: "Contact Name : ", value: "contact_name" }];

  const filterSearchItems = (searchValue, searchTyp) => {
    // if (searchValue.length === 0) {
    //   dispatch(fetchSearchProduct({ "": "" }, "filters"));
    // } else {
    //   dispatch(
    //     fetchSearchProduct({ [searchTyp]: searchValue }, "filters")
    //   );
    // }
  };

  const searchItems = searchValue => {
    // if (searchValue.length === 0) {
    //   dispatch(fetchSearchProduct({ "": "" }, "search"));
    // } else {
    //   dispatch(
    //     fetchSearchProduct({ [searchType]: searchValue }, "search")
    //   );
    // }
  };

  const handleButtonClick = value => {
    history.push("/contacts/create");
  };

  return (
    contacts_table_data.length > 0 && (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <RemoteWrapper>
            <RemoteDynamicAppBar
              dynamicAppBar={dynamicAppBar}
              sortOptions={sortOptions}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              filterSearchItems={filterSearchItems}
              searchItems={searchItems}
              searchOptions={searchOptions}
              searchType={searchType}
              setSearchType={setSearchType}
              //handleButtonClick={handleButtonClick}
              buttons={[
                {
                  name: "Create",
                  handleButtonClick: handleButtonClick,
                  flag: access
                    ?.find(row => row === row)
                    ?.view_actions_json?.find(o => o.lookup_code === "CREATE")
                    ?.ctrl_flag,
                },
              ]}
            />
          </RemoteWrapper>
        </Suspense>
        {deleteModalOpen && (
          <Suspense fallback={<div>Loading... </div>}>
            <RemoteWrapper>
              <RemoteModalViewV2
                handleDeleteProduct={handleDeleteProduct}
                handleModalClose={handleDeleteModalClose}
                modalOpen={deleteModalOpen}
                primary={
                  "Selected Pick List will be deleted permanentely. Are you sure you want to do this?"
                }
                secondary={""}
                disclaimer={
                  "Note: This will get deleted permanantly from the list"
                }
                actionBtns={["Cancel", "Delete"]}
              />
            </RemoteWrapper>
          </Suspense>
        )}

        {contacts_table_data.length > 0 &&
          access &&
          access[0]?.module_ctrl_flag && (
            <div>
              <RemoteDynamicTable
                table_data={contacts_table_data}
                headCells={headCells}
                info={contactsdata_table_meta.info}
                customOptions={customOptions}
                setCustomOptions={setCustomOptions}
                setParams={setParams}
                handleChangeDyanmicAppBar={handleChangeDyanmicAppBar}
                setId={setId}
                enablepagination={true}
              />
            </div>
          )}
      </div>
    )
  );
};
export default ContactsIndex;

/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License v3.0 as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License v3.0 for more details.
 You should have received a copy of the GNU Lesser General Public License v3.0
 along with this program.  If not, see <https://www.gnu.org/licenses/lgpl-3.0.html/>.
*/
