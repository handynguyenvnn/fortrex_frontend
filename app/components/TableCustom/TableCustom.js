/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useRef } from 'react';
import { Pagination, Table } from 'antd';
import Empty from 'antd/es/empty';
import PropTypes from 'prop-types';
import { removeParamsForServer } from 'utils/utils';
import {DEFAULT_ZERO, DEFAULT_PAGE_INDEX, PAGE_SIZE} from 'constants/constant';
import './styles.scss';

const TableCustom = props => {
  const { useStore, columns, apiGetList, rowSelection, onRow } = props;
  const [isLoading, setLoading] = useState(false);
  const [store, updateStore] = useStore();
  const [pageIndex, setPageIndex] = useState(store.pageIndex);
  const [pageSize, setPageSize] = useState(store.pageSize);
  const [totalRecords, setTotalRecords] = useState(DEFAULT_ZERO);
  const [data, setData] = useState([]);
  const isMounted = useRef(true);

  const fetchData = () => {
    setLoading(true);
    updateStore(draft => {
      draft.loading = true;
    });
    const params = {
      ...store.params
    };
    apiGetList({
      params: {
        ...removeParamsForServer(params),
        id: store.id,
        PageIndex: store.pageIndex,
        PageSize: store.pageSize
      }
    })
      .then(res => {
        if (isMounted.current) {
          setData(res.data.Reply.Item || []);
          setTotalRecords(res.data.Reply.Total || DEFAULT_ZERO);
          updateStore(draft => {
            draft.isReloadTable = false;
          });
        }
      })
      .catch(() => {
        setData([]);
        setTotalRecords(DEFAULT_ZERO);
      })
      .finally(() => {
        if (isMounted.current) {
          setLoading(false);
          updateStore(draft => {
            draft.isReloadTable = false;
            draft.loading = false;
          });
        }
      });
  };

  const onPageChange = pageIdx => {
    updateStore(draft => {
      draft.pageIndex = pageIdx;
      draft.isReloadTable = true;
    }); 
     if (pageIdx == 1 ){
      pageIdx = 0;
    }
    if (pageIdx >=2 ){
      pageIdx = pageIdx -1;
    }
    setPageIndex(pageIdx);
  };

  const onShowSizeChange = (current, pageSizeNew) => {
    updateStore(draft => {
      draft.pageSize = pageSizeNew;
      draft.pageIndex = DEFAULT_PAGE_INDEX;
      draft.isReloadTable = true;
    });
    setPageSize(pageSizeNew);
    setPageIndex(DEFAULT_PAGE_INDEX);
  };

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );


  useEffect(() => {
    if (store.isReloadTable === false) return;
    setPageIndex(store.pageIndex);
    fetchData();
  }, [store.isReloadTable]);

  const preExecuteData = (dataList = [], page = 1) =>
    dataList.map((dta, index) => ({
      index: `${Number((page - 1) * pageSize) + Number(index) + 1}`,
      ...dta
    }));

  return (
    <div className="table f-width table-custom">
      <Table
        locale={{ emptyText: <Empty description="Empty!" /> }}
        bordered
        rowKey={record => (record.id || record.Id)}
        size="small"
        loading={isLoading}
        columns={columns}
        dataSource={preExecuteData(data, pageIndex)}
        rowSelection={rowSelection}
        pagination={false}
        onRow={onRow}
        className='time-table-row-select'
      />
      <br />
      {
        totalRecords > PAGE_SIZE && <Pagination
          size="small"
          defaultCurrent={1}
          current={pageIndex}
          pageSize={pageSize}
          total={totalRecords > 10 ? totalRecords  - 10 : totalRecords}
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
          style={{ float: 'right' }}
          showSizeChanger={false}
          showTitle={false}
          disabled={isLoading}
        />
      }

    </div>
  );
};

TableCustom.propTypes = {
  useStore: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  columns: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]).isRequired,
  apiGetList: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  rowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onRow: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

TableCustom.defaultProps = {
  rowSelection: undefined,
  onRow: () => {}
};
export default TableCustom;
