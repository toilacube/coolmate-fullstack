/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropright } from 'react-icons/io'
import TreeView, { flattenTree } from 'react-accessible-treeview'
import './styles.css'
import { useRouter } from 'next/navigation'
import cx from 'classnames'

function Filtering({ categories, search = '' }) {
  const router = useRouter()
  const [data, setData] = useState()
  const [treeData, setTreeData] = useState()
  useEffect(() => {
    if (categories) setData(flattenTree(categories))
  }, [categories])
  useEffect(() => {
    if (data) setTreeData(data)
  }, [data])
  const filter = (value) => {
    const filtered = []
    const includeChildren = (id) => {
      data.forEach((item) => {
        if (item.parent === id) {
          if (!filtered.find((x) => x.id === item.id)) {
            filtered.push(item)
          }
          if (item.children.length) {
            includeChildren(item.id)
          }
        }
      })
    }
    data.forEach((item) => {
      if (item.id === 'ROOT') {
        return
      }
      if (item.name.includes(value.toUpperCase())) {
        if (!filtered.find((x) => x.id === item.id)) {
          filtered.push(item)
        }

        if (item.children.length) {
          includeChildren(item.id)
        }
      }
    })
    filtered.unshift(
      Object.assign({
        ...data[0],
        children: data[0].children.filter((id) =>
          filtered.find((fitem) => fitem.id === id)
        )
      })
    )
    setTreeData(filtered)
  }

  const filterNodesByText = (valueToFilter) => {
    if (!!valueToFilter) {
      filter(valueToFilter)
    } else {
      setTreeData(data)
    }
  }
  useEffect(() => {
    filterNodesByText(search)
  }, [search])
  const handleEditCategory = (event, element) => {
    event.stopPropagation()
    router.push(
      `/admin/edit-category/${element.id}?name=${element.name}&parent_category=${element.parent}`
    )
  }

  return (
    <div className="h-fit">
      {treeData?.length > 1 ? (
        <div className="filtered">
          <TreeView
            data={treeData}
            aria-label="Filtered tree"
            multiSelect
            propagateSelect
            propagateSelectUpwards
            togglableSelect
            nodeRenderer={({
              element,
              isBranch,
              isExpanded,
              getNodeProps,
              level,
              handleExpand
            }) => {
              return (
                <div
                  {...getNodeProps({ onClick: handleExpand })}
                  style={{ marginLeft: 40 * (level - 1) }}
                  className="w-fit rounded-md cursor-pointer group"
                >
                  <div className="flex items-center ">
                    {isBranch && <ArrowIcon isOpen={isExpanded} />}

                    <span
                      className="px-2 py-1 text-[17px] font-normal group-hover:font-medium hover:bg-accent hover:text-accent-foreground scale-90 hover:scale-100"
                      onClick={(e) => handleEditCategory(e, element)}
                    >
                      {element.name}
                    </span>
                  </div>
                </div>
              )
            }}
          />
        </div>
      ) : (
        <div className="text-zinc-500/90 uppercase flex items-center justify-center h-screen">
          Not Found This!
        </div>
      )}
    </div>
  )
}

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = 'arrow'
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  )
  return <IoMdArrowDropright className={classes} />
}

export default Filtering
