const assetPathPrefix = "./assets"
const imgGroup = `${assetPathPrefix}/af962.svg`
const imgFilter = `${assetPathPrefix}/de382.svg`
const imgClose = `${assetPathPrefix}/ffb94.svg`
const imgCheck = `${assetPathPrefix}/57301.svg`

type SearchBarProps = {
  className?: string
  property1?: "Default" | "Variant2"
}

function SearchBar({ className, property1 = "Default" }: SearchBarProps) {
  const isVariant2 = property1 === "Variant2"
  return (
    <div
      className={
        className ||
        `bg-[#f9fafb] border border-[#e5e7eb] border-solid content-stretch flex overflow-clip pl-[4px] pr-[8px] relative rounded-[8px] w-[698px] ${
          isVariant2
            ? "flex-col gap-[8px] items-start pb-[8px] pt-[5px]"
            : "h-[50px] items-center justify-center"
        }`
      }
      id={isVariant2 ? "node-4090_14910" : "node-4065_3395"}
    >
      <div
        className={`relative shrink-0 w-[686px] ${
          isVariant2
            ? "content-stretch flex items-center justify-between"
            : "h-[40px]"
        }`}
        id={isVariant2 ? "node-4090_15033" : "node-4090_15443"}
      >
        <div
          className={`h-[40px] w-[159px] ${
            isVariant2 ? "relative shrink-0" : "absolute left-0 top-0"
          }`}
          id={isVariant2 ? "node-4090_14911" : "node-4090_14824"}
        >
          <div
            className="absolute content-stretch flex gap-[8px] items-center left-0 top-0"
            id={isVariant2 ? "node-4090_14912" : "node-4090_14804"}
          >
            <div
              className="content-stretch flex items-start overflow-clip relative shrink-0"
              id={isVariant2 ? "node-4090_14913" : "node-4003_39222"}
              data-name="Icons-Final"
            >
              <div
                className="overflow-clip relative shrink-0 size-[40px]"
                id={
                  isVariant2
                    ? "node-I4090_14913-4001_33861"
                    : "node-I4003_39222-4001_33861"
                }
                data-name="tool-ask-mtm 1"
              >
                <div
                  className="absolute contents inset-[20.39%_17.06%_16.24%_17.06%]"
                  id={
                    isVariant2
                      ? "node-I4090_14913-4001_33861-4001_35198"
                      : "node-I4003_39222-4001_33861-4001_35198"
                  }
                  data-name="Layer 1"
                >
                  <div
                    className="absolute contents inset-[20.39%_17.06%_16.24%_17.06%]"
                    id={
                      isVariant2
                        ? "node-I4090_14913-4001_33861-4001_35199"
                        : "node-I4003_39222-4001_33861-4001_35199"
                    }
                    data-name="Group"
                  >
                    <div
                      className="absolute inset-[20.39%_17.06%_16.24%_17.06%]"
                      id={
                        isVariant2
                          ? "node-I4090_14913-4001_33861-4001_35200"
                          : "node-I4003_39222-4001_33861-4001_35200"
                      }
                      data-name="Group"
                    >
                      <div className="absolute inset-[-3.26%_-3.14%]">
                        <img
                          alt=""
                          className="block max-w-none size-full"
                          src={imgGroup}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p
              className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[1.4] relative shrink-0 text-[18px] text-black tracking-[-0.5px] whitespace-nowrap"
              id={isVariant2 ? "node-4090_14914" : "node-4065_13747"}
              style={{ fontVariationSettings: '"wdth" 100' }}
            >
              Search reports
            </p>
          </div>
        </div>
        <button
          className={`bg-[#ebecee] border border-[rgba(0,0,0,0.19)] border-solid content-stretch cursor-pointer flex items-center justify-center opacity-80 p-[4px] rounded-[8px] size-[34px] ${
            isVariant2 ? "relative shrink-0" : "absolute left-[652px] top-[3px]"
          }`}
          id={isVariant2 ? "node-4090_15465" : "node-4090_14841"}
        >
          {property1 === "Default" && (
            <div
              className="content-stretch flex items-start overflow-clip relative shrink-0"
              data-node-id="4090:14852"
              data-name="Icons-Final"
            >
              <div
                className="h-[18px] relative shrink-0 w-[19px]"
                data-node-id="4090:14855"
                data-name="Filter"
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgFilter}
                />
              </div>
            </div>
          )}
          {isVariant2 && (
            <div
              className="relative shrink-0 size-[24px]"
              data-node-id="4090:15473"
              data-name="close"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgClose}
              />
            </div>
          )}
        </button>
      </div>
      {isVariant2 && (
        <div
          className="content-stretch flex flex-col gap-[16px] items-start pb-[8px] px-[4px] relative shrink-0 w-full"
          data-node-id="4090:15442"
        >
          <div
            className="content-stretch flex h-[21px] items-start justify-between relative shrink-0 w-full"
            data-node-id="4090:15340"
          >
            <div
              className="content-stretch flex h-full items-center relative shrink-0"
              data-node-id="4090:15341"
            >
              <p
                className="[word-break:break-word] font-['Roboto:Regular'] font-normal leading-[1.2] relative shrink-0 text-[16px] text-black tracking-[-0.5px] whitespace-nowrap"
                data-node-id="4090:15346"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                Filters
              </p>
            </div>
            <div
              className="flex items-center justify-center relative shrink-0"
              data-node-id="4090:15347"
            >
              <div className="flex-none rotate-180">
                <button
                  className="content-stretch cursor-pointer flex items-start opacity-0 overflow-clip relative"
                  data-name="Icons-Final"
                >
                  <div
                    className="relative shrink-0 size-[32px]"
                    data-node-id="I4090:15347;4001:33861"
                    data-name="keyboard_arrow_down"
                  />
                </button>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-col gap-[16px] items-start px-[8px] relative shrink-0 w-full"
            data-node-id="4090:15348"
          >
            <div
              className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full"
              data-node-id="4090:15349"
            >
              <p
                className="[word-break:break-word] col-1 font-['Roboto:Medium'] font-medium justify-self-stretch leading-[1.1] relative row-1 self-start shrink-0 text-[14.314px] text-black tracking-[0.2863px] uppercase"
                data-node-id="4090:15350"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                Product
              </p>
              <div
                className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15351"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15351;9762:1443"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-[#1659f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15351;565:14466"
                    data-name="Checkbox"
                  >
                    <div
                      className="relative shrink-0 size-[17.65px]"
                      data-node-id="I4090:15351;565:14467"
                      data-name="Check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15351;280:12941"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    MTM 18+
                  </p>
                </div>
              </div>
              <div
                className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15352"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15352;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15352;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15352;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Junior
                  </p>
                </div>
              </div>
              <div
                className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15353"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15353;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15353;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15353;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Newcomers
                  </p>
                </div>
              </div>
            </div>
            <div
              className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(3,fit-content(100%))] relative shrink-0 w-full"
              data-node-id="4090:15354"
            >
              <p
                className="[word-break:break-word] col-1 font-['Roboto:Medium'] font-medium justify-self-stretch leading-[1.1] relative row-1 self-start shrink-0 text-[14.314px] text-black tracking-[0.2863px] uppercase"
                data-node-id="4090:15355"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                Genre
              </p>
              <div
                className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15356"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15356;9762:1443"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-[#1659f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15356;565:14466"
                    data-name="Checkbox"
                  >
                    <div
                      className="relative shrink-0 size-[17.65px]"
                      data-node-id="I4090:15356;565:14467"
                      data-name="Check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15356;280:12941"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    TV/Video
                  </p>
                </div>
              </div>
              <div
                className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15357"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15357;9762:1443"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-[#1659f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15357;565:14466"
                    data-name="Checkbox"
                  >
                    <div
                      className="relative shrink-0 size-[17.65px]"
                      data-node-id="I4090:15357;565:14467"
                      data-name="Check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15357;280:12941"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Radio/Audio
                  </p>
                </div>
              </div>
              <div
                className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15358"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15358;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15358;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15358;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Internet
                  </p>
                </div>
              </div>
              <div
                className="col-4 content-stretch flex flex-col h-[17.65px] items-start justify-self-stretch relative row-2 shrink-0"
                data-node-id="4090:15359"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15359;9762:1443"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-[#1659f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15359;565:14466"
                    data-name="Checkbox"
                  >
                    <div
                      className="relative shrink-0 size-[17.65px]"
                      data-node-id="I4090:15359;565:14467"
                      data-name="Check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15359;280:12941"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Mobile
                  </p>
                </div>
              </div>
              <div
                className="col-1 content-stretch flex flex-col h-[17.65px] items-start justify-self-stretch relative row-3 shrink-0"
                data-node-id="4090:15360"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15360;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15360;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15360;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Demographic
                  </p>
                </div>
              </div>
              <div
                className="col-2 content-stretch flex flex-col h-[17.65px] items-start justify-self-stretch relative row-3 shrink-0"
                data-node-id="4090:15361"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15361;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15361;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15361;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Market
                  </p>
                </div>
              </div>
            </div>
            <div
              className="gap-x-[8px] gap-y-[8px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[repeat(2,fit-content(100%))] relative shrink-0 w-full"
              data-node-id="4090:15362"
            >
              <p
                className="[word-break:break-word] col-1 font-['Roboto:Medium'] font-medium justify-self-stretch leading-[1.1] relative row-1 self-start shrink-0 text-[14.314px] text-black tracking-[0.2863px] uppercase"
                data-node-id="4090:15363"
                style={{ fontVariationSettings: '"wdth" 100' }}
              >
                Type
              </p>
              <div
                className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15364"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15364;9762:1443"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-[#1659f3] content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15364;565:14466"
                    data-name="Checkbox"
                  >
                    <div
                      className="relative shrink-0 size-[17.65px]"
                      data-node-id="I4090:15364;565:14467"
                      data-name="Check"
                    >
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgCheck}
                      />
                    </div>
                  </div>
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15364;280:12941"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Report
                  </p>
                </div>
              </div>
              <div
                className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15365"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15365;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15365;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15365;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Infographic
                  </p>
                </div>
              </div>
              <div
                className="col-3 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15366"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15366;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15366;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15366;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Adoption
                  </p>
                </div>
              </div>
              <div
                className="col-4 content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-stretch shrink-0"
                data-node-id="4090:15367"
                data-name="Checkbox Field"
              >
                <div
                  className="content-stretch flex gap-[13.237px] items-start min-w-[132.37207889556885px] relative shrink-0 w-full"
                  data-node-id="I4090:15367;565:15611"
                  data-name="Checkbox and Label"
                >
                  <div
                    className="bg-white border-[#757575] border-[1.103px] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[4.412px] shrink-0 size-[17.65px]"
                    data-node-id="I4090:15367;565:15621"
                    data-name="Checkbox"
                  />
                  <p
                    className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular'] font-normal leading-[1.1] min-w-px relative text-[14.6px] text-black tracking-[-0.146px]"
                    data-node-id="I4090:15367;565:15614"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    Sneak Peek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
